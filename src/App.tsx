/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Schedule from './pages/Schedule';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import PatientDetail from './pages/PatientDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/:id" element={<PatientDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="chats" element={<Chats />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
