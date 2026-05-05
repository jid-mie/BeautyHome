import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Globe, Clock, XCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { authApi } from '../api/authApi';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Session {
  id: number;
  name: string;
  last_used_at: string | null;
  created_at: string;
  is_current: boolean;
}

const SessionManager: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<number | null>(null);

  const fetchSessions = async () => {
    try {
      const response = await authApi.getSessions();
      if (response.success) {
        setSessions(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi thiết bị này?')) return;
    
    setRevokingId(id);
    try {
      await authApi.revokeSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to revoke session:', error);
      alert('Không thể đăng xuất thiết bị. Vui lòng thử lại.');
    } finally {
      setRevokingId(null);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) return <Smartphone size={20} />;
    if (ua.includes('windows') || ua.includes('macintosh') || ua.includes('linux')) return <Monitor size={20} />;
    return <Globe size={20} />;
  };

  const formatDeviceName = (name: string) => {
    if (name.includes('Windows')) return 'Windows PC';
    if (name.includes('Macintosh')) return 'MacBook / iMac';
    if (name.includes('iPhone')) return 'iPhone';
    if (name.includes('Android')) return 'Android Phone';
    if (name.length > 30) return name.substring(0, 30) + '...';
    return name;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-emerald-500" size={24} />
          <h3 className="text-xl font-bold text-slate-900">Phiên đăng nhập</h3>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
          {sessions.length} thiết bị
        </span>
      </div>

      <p className="text-sm text-slate-500 leading-relaxed max-w-md">
        Danh sách các thiết bị hiện đang đăng nhập vào tài khoản của bạn. Bạn có thể đăng xuất khỏi các thiết bị không nhận diện được.
      </p>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className={`p-6 rounded-[32px] border transition-all flex items-center justify-between ${
              session.is_current 
                ? 'bg-emerald-50/30 border-emerald-100 ring-1 ring-emerald-50' 
                : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm shadow-slate-200/40'
            }`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                session.is_current ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
              }`}>
                {getDeviceIcon(session.name)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">{formatDeviceName(session.name)}</span>
                  {session.is_current && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      Hiện tại
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 space-x-4 text-xs font-medium">
                  <div className="flex items-center text-slate-400">
                    <Clock size={12} className="mr-1.5" />
                    <span>
                      {session.last_used_at 
                        ? `Hoạt động ${formatDistanceToNow(new Date(session.last_used_at), { addSuffix: true, locale: vi })}` 
                        : 'Vừa mới đăng nhập'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {!session.is_current && (
              <button 
                onClick={() => handleRevoke(session.id)}
                disabled={revokingId === session.id}
                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all disabled:opacity-50"
                title="Đăng xuất thiết bị này"
              >
                {revokingId === session.id ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <XCircle size={20} />
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 flex items-center justify-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Bảo mật bởi BeautyHome Security
        </p>
      </div>
    </div>
  );
};

export default SessionManager;
