import { useState, useEffect } from 'react';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { StatusSelector } from '../components/StatusSelector';
import { Header } from '../components/Header';
import { Login } from '../components/Login';
import { useAdmin } from '../contexts/AdminContext';
import { toast } from 'sonner';

const Index = () => {
  const { teamMembers, updateTeamMember, isAuthenticated, currentUser } = useAdmin();
  const [currentTeamMember, setCurrentTeamMember] = useState(null);

  // Move all hooks to the top before any conditional returns
  useEffect(() => {
    if (currentUser && teamMembers.length > 0) {
      const memberData = teamMembers.find(member => member.name === currentUser.name) || teamMembers[0];
      setCurrentTeamMember(memberData);
    }
  }, [currentUser, teamMembers]);

  useEffect(() => {
    if (!isAuthenticated || !currentTeamMember) return;
    
    const interval = setInterval(() => {
      const otherMembers = teamMembers.filter(member => member.id !== currentTeamMember?.id);
      if (otherMembers.length > 0) {
        const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
        const statuses = ['available', 'busy', 'in-meeting', 'offline'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (randomMember.status !== randomStatus) {
          updateTeamMember(randomMember.id, { status: randomStatus });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [teamMembers, currentTeamMember?.id, updateTeamMember, isAuthenticated]);

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login />;
  }

  const handleStatusChange = (newStatus) => {
    if (!currentTeamMember) return;
    
    const updatedMember = { ...currentTeamMember, status: newStatus, lastUpdated: new Date() };
    setCurrentTeamMember(updatedMember);
    updateTeamMember(currentTeamMember.id, { status: newStatus });

    toast.success(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace('-', ' ')}`);
  };

  if (teamMembers.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">No Team Members</h2>
            <p className="text-slate-400">Use the admin panel to add team members.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Current User Status Section */}
        {currentTeamMember && (
          <div className="mb-8">
            <div className="bg-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-6">Your Status</h2>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <TeamMemberCard member={currentTeamMember} isCurrentUser={true} />
                <div className="flex-1">
                  <StatusSelector 
                    currentStatus={currentTeamMember.status} 
                    onStatusChange={handleStatusChange} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers
              .filter(member => member.id !== currentTeamMember?.id)
              .map(member => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800 rounded-xl shadow-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6">Team Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(['available', 'busy', 'in-meeting', 'offline']).map(status => {
              const count = teamMembers.filter(member => member.status === status).length;
              const statusColors = {
                available: 'bg-emerald-500 text-white',
                busy: 'bg-red-500 text-white',
                'in-meeting': 'bg-amber-500 text-white',
                offline: 'bg-slate-600 text-slate-200'
              };
              
              return (
                <div key={status} className="text-center">
                  <div className={`rounded-lg p-4 ${statusColors[status]} shadow-lg`}>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm font-medium capitalize">
                      {status.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
