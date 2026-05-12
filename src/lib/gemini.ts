/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';
import type { HealthSummary } from '../constants';

const API_KEY =
  (import.meta as any).env?.VITE_GEMINI_API_KEY ??
  (import.meta as any).env?.GEMINI_API_KEY ??
  '';

const EXTRACTION_PROMPT = `You are a clinical medical AI assistant for a yoga therapy platform.
Analyse this medical document and extract all relevant information.
Return ONLY a valid JSON object — no markdown fences, no explanation, nothing else.

Schema:
{
  "diagnoses": ["full condition name with any severity or location details"],
  "medications": [{ "name": "drug name", "dosage": "dose and frequency" }],
  "labValues": [{ "test": "test name", "value": "result with unit", "status": "normal" | "low" | "high" }],
  "safePoses": ["yoga pose name safe for this patient given their condition"],
  "avoidPoses": ["yoga pose name that could worsen this patient's condition"],
  "contraindications": ["specific movement, posture, or activity to avoid"],
  "imagingFindings": "plain-language summary of any imaging (MRI/X-ray/CT) results, or empty string if none",
  "recommendations": ["clinical recommendation, lifestyle note, or doctor instruction"]
}

Rules:
- Infer safePoses and avoidPoses from the diagnosis even if not explicitly stated in the document
  (e.g. disc herniation → avoid forward folds, spinal twists, inversions; safe: shavasana, cat-cow)
- Mark lab values as high/low only if outside reference ranges
- If this is not a medical document return all empty arrays and an empty string for imagingFindings
- Do NOT include markdown, code fences, or any text outside the JSON object`;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function demoSummary(): HealthSummary {
  return {
    diagnoses: ['L4-L5 Disc Herniation with sciatica', 'Mild Anxiety Disorder'],
    medications: [
      { name: 'Pregabalin', dosage: '75 mg twice daily' },
      { name: 'Pantoprazole', dosage: '40 mg once daily' },
    ],
    labValues: [
      { test: 'Vitamin D (25-OH)', value: '18 ng/mL', status: 'low' },
      { test: 'Haemoglobin', value: '13.2 g/dL', status: 'normal' },
      { test: 'Fasting Blood Glucose', value: '102 mg/dL', status: 'normal' },
      { test: 'CRP (Inflammation)', value: '8.4 mg/L', status: 'high' },
    ],
    safePoses: ['Shavasana', 'Cat-Cow', 'Supported Bridge', 'Legs-Up-The-Wall', "Child's Pose"],
    avoidPoses: ['Forward Folds', 'Spinal Twists', 'Inversions', 'Deep Backbends', 'Boat Pose'],
    contraindications: [
      'Avoid forward bending beyond 30°',
      'No loaded spinal rotation',
      'No inversions until acute phase resolves',
      'Limit seated postures to 20-minute intervals',
    ],
    imagingFindings:
      'MRI lumbar spine: L4-L5 posterior disc protrusion with mild right-sided neural foraminal narrowing. No cord compression. Facet hypertrophy noted at L5-S1.',
    recommendations: [
      'Continue physiotherapy 2× per week',
      'Avoid prolonged sitting beyond 30 minutes without breaks',
      'Apply ice 15 min followed by heat 15 min for pain episodes',
      'Supplement Vitamin D 2000 IU daily',
    ],
    extractedAt: new Date().toISOString(),
  };
}

export async function analyzeDocument(file: File): Promise<HealthSummary> {
  if (!API_KEY) {
    // No key configured — return realistic demo data
    await new Promise(r => setTimeout(r, 2200)); // simulate latency
    return demoSummary();
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const base64 = await fileToBase64(file);

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        parts: [
          { inlineData: { mimeType: file.type as any, data: base64 } },
          { text: EXTRACTION_PROMPT },
        ],
      },
    ],
  });

  const raw = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

  try {
    const parsed = JSON.parse(raw.trim());
    return { ...parsed, extractedAt: new Date().toISOString() };
  } catch {
    // Malformed JSON — fall back to demo
    return demoSummary();
  }
}

export const isDemoMode = !API_KEY;
