import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AerodynamicsScroll } from './components/AerodynamicsScroll';
import { RevSimulator } from './components/RevSimulator';
import { CarCustomizer } from './components/CarCustomizer';
import { ModelLineup } from './components/ModelLineup';
import { LaunchControl } from './components/LaunchControl';
import { SpecsGrid } from './components/SpecsGrid';
import { Footer } from './components/Footer';
import { TestDriveModal } from './components/TestDriveModal';

export const App: React.FC = () => {
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);

  const handleOpenTestDrive = () => setTestDriveModalOpen(true);
  const handleCloseTestDrive = () => setTestDriveModalOpen(false);

  return (
    <div className="relative min-h-screen bg-[#07090D] text-white selection:bg-[#E10600] selection:text-white font-sans">
      {/* Header Navigation */}
      <Navbar onOpenTestDrive={handleOpenTestDrive} />

      {/* Main Website Sections */}
      <main>
        <Hero onOpenTestDrive={handleOpenTestDrive} />
        <SpecsGrid />
        <AerodynamicsScroll />
        <RevSimulator />
        <CarCustomizer />
        <ModelLineup onOpenTestDrive={handleOpenTestDrive} />
        <LaunchControl />
      </main>

      {/* Footer */}
      <Footer />

      {/* Test Drive Reservation Modal */}
      <TestDriveModal isOpen={testDriveModalOpen} onClose={handleCloseTestDrive} />
    </div>
  );
};

export default App;
