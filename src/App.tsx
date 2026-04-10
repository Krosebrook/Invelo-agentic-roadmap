import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SynthesisView } from './components/SynthesisView';
import { MemoView } from './components/MemoView';
import { OpportunityView } from './components/OpportunityView';
import { WeavingView } from './components/WeavingView';
import { AgentConfigView } from './components/AgentConfigView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';

export default function App() {
  const [currentView, setCurrentView] = useState('synthesis');
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

  const handleSelectMemo = (id: string) => {
    setSelectedMemoId(id);
    setCurrentView('memos');
  };

  const renderContent = () => {
    if (currentView === 'synthesis') {
      return <SynthesisView onSelectMemo={handleSelectMemo} />;
    }
    if (currentView === 'memos') {
      return (
        <MemoView 
          memoId={selectedMemoId} 
          onBack={() => setSelectedMemoId(null)} 
          onSelectMemo={handleSelectMemo}
        />
      );
    }
    if (currentView === 'opportunities') {
      return <OpportunityView />;
    }
    if (currentView === 'knowledge') {
      return <KnowledgeBaseView />;
    }
    if (currentView === 'weaving') {
      return <WeavingView />;
    }
    if (currentView === 'config') {
      return <AgentConfigView />;
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view !== 'memos') {
            setSelectedMemoId(null);
          }
        }} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
