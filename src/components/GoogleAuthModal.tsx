import React, { useState } from 'react';
import { useBlog, OWNER_EMAIL } from '../context/BlogContext';
import { X, Lock, ShieldCheck, AlertCircle, LogOut, Loader2, CloudCheck, ExternalLink } from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithGoogleReal, 
    user, 
    logout, 
    isOwnerAuthenticated,
    isAuthLoading,
    isCloudSynced
  } = useBlog();

  const [authError, setAuthError] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);

  if (!isAuthModalOpen) return null;

  const handleRealGoogleLogin = async () => {
    setAuthError(null);
    setInProgress(true);
    const res = await loginWithGoogleReal();
    setInProgress(false);
    if (!res.success && res.error) {
      setAuthError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md flex justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200 font-sans">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-950">Admin Authentication</h3>
              <p className="text-[11px] font-mono text-zinc-500">Live Firebase & Google Account OAuth</p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Cloud Sync Status Banner */}
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-600">Cloud Database:</span>
            {isCloudSynced ? (
              <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Firestore Connected</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Connecting to Cloud...</span>
              </span>
            )}
          </div>

          {/* Current Auth Status */}
          {user ? (
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-zinc-500 font-semibold">Active Google Session</span>
                {user.isOwner ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Owner Verified</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>Unauthorized</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-zinc-300 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-700">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-bold text-zinc-950 truncate">{user.name}</p>
                  <p className="text-xs font-mono text-zinc-500 truncate">{user.email}</p>
                </div>
              </div>

              {!user.isOwner && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-800 font-sans leading-relaxed">
                  <strong>Access Denied:</strong> Your Google account ({user.email}) is authenticated, but it is not authorized for administration. Only the site owner (<strong className="font-mono text-red-950">{OWNER_EMAIL}</strong>) can edit or customize this blog.
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-red-600 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                {user.isOwner && (
                  <button
                    onClick={() => setIsAuthModalOpen(false)}
                    className="px-4 py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-md text-xs font-mono uppercase font-semibold cursor-pointer"
                  >
                    Open Studio
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-sm text-zinc-700 font-sans leading-relaxed">
                  This administrative panel uses <strong>real Google OAuth</strong> via Firebase Authentication. Only sign-ins matching <strong className="font-mono text-zinc-950 font-bold">{OWNER_EMAIL}</strong> are granted editing, customization, and analytical privileges.
                </p>
              </div>

              {/* Error message */}
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-800 font-sans flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Primary Real Google Login Button */}
              <button
                onClick={handleRealGoogleLogin}
                disabled={inProgress}
                className="w-full py-3 px-4 bg-white hover:bg-zinc-50 disabled:bg-zinc-100 text-zinc-800 border border-zinc-300 rounded-lg shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer group hover:border-zinc-400"
              >
                {inProgress ? (
                  <Loader2 className="w-5 h-5 text-zinc-700 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span className="font-semibold text-sm text-zinc-900 group-hover:text-black">
                  {inProgress ? 'Opening Google Account Popup...' : 'Sign in with Google Account'}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Security Protocol · Real Google Auth</span>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="hover:text-zinc-900 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
