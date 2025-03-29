'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, AlertTriangle, Bomb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useCounter } from '@/hooks/useCounter';

export default function Home() {
  const { counter, error, isLoading, mutate } = useCounter();
  
  const [isError, setIsError] = useState(false);

  const fireConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      scalar: 0.8,
      colors: ['#ff0000', '#00ff00', '#0000ff'],
    });

    fire(0.2, {
      spread: 60,
      scalar: 1.2,
      colors: ['#ff00ff', '#00ffff', '#ffff00'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#ffffff', '#ff69b4', '#00ff00'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#gold', '#ff1493', '#00ffff'],
    });

    fire(0.1, {
      spread: 180,
      startVelocity: 45,
      colors: ['#ff69b4', '#00ff00', '#00ffff'],
    });
  }, []);

  const triggerError = () => {
    setIsError(true);
    toast.error('SIMULATED CATASTROPHIC FAILURE', {
      description: 'This is what happens when our mission-critical click infrastructure fails!',
      duration: 5000,
    });
    
    const element = document.documentElement;
    element.classList.add('shake-animation');
    setTimeout(() => {
      element.classList.remove('shake-animation');
    }, 1000);
  };

  const onClick = () => {
    setIsError(false)
    const currentUrl = window.location.host
    fetch(`http://${currentUrl}:3000/api/counter`, {
      method: 'PUT',
    })
      .then(() => {
        mutate()
        fireConfetti()
      })
      .catch(() => {
        triggerError()
      })
  };

  useEffect(() => {
    if (error) {
      triggerError()
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake-animation {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .error-bg {
          animation: error-flash 0.5s ease infinite;
        }
        
        @keyframes error-flash {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(220, 38, 38, 0.1); }
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-8 transition-all duration-300 ${isError ? 'error-bg' : ''}`}>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all">
              Enterprise Ready • ISO 27001 • SOC 2 Type II
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              ClickMetrics™ Pro
            </h1>
            <p className="text-gray-400 text-lg">
              Revolutionizing Click Analytics Since 2024
            </p>
          </div>

          {/* Main Card */}
          <Card className={`p-8 bg-black/50 border-2 ${isError ? 'border-red-500/50' : 'border-purple-500/30'} backdrop-blur-xl transition-all duration-300`}>
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {counter} clicks
                </div>
                {isError && (
                  <div className="flex items-center justify-center gap-2 text-red-500 animate-bounce">
                    <AlertTriangle className="h-6 w-6" />
                    <span>SYSTEM CRITICAL ERROR</span>
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                )}
              </div>

              <Button
                size="lg"
                className={`
                  w-64 h-64 rounded-full text-2xl font-bold
                  ${isError 
                    ? 'bg-red-600 hover:bg-red-500' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'}
                  shadow-[0_0_40px_rgba(167,139,250,0.5)]
                  hover:shadow-[0_0_60px_rgba(167,139,250,0.7)]
                  transition-all duration-300
                  ${isLoading ? 'animate-pulse' : ''}
                  transform hover:rotate-3
                  disabled:opacity-50
                `}
                onClick={onClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin">⌛</div>
                ) : (
                  <>
                    <Sparkles className={`mr-2 h-8 w-8 ${isError ? '' : 'animate-spin'}`} />
                    CLICK ME!
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            Powered by Advanced AI • Cloud-Native • Web 3.0 Ready • Enterprise Grade
          </div>
        </div>
      </div>
    </>
  );
}


