import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Eye, EyeOff, Wifi, QrCode } from 'lucide-react';
import { STORE_CONFIG } from '../constants/storeConfig';

interface WifiBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WifiBottomSheet: React.FC<WifiBottomSheetProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedSsid, setCopiedSsid] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    // Gera o QR Code oficial de conexão Wi-Fi
    QRCode.toDataURL(STORE_CONFIG.wifi.qrPayload, {
      width: 240,
      margin: 1.5,
      color: {
        dark: '#050B18',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error('Erro ao gerar QR Code:', err));
  }, []);

  if (!isOpen) return null;

  const handleCopyPass = async () => {
    try {
      await navigator.clipboard.writeText(STORE_CONFIG.wifi.password);
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2200);
    } catch {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2200);
    }
  };

  const handleCopySsid = async () => {
    try {
      await navigator.clipboard.writeText(STORE_CONFIG.wifi.ssid);
      setCopiedSsid(true);
      setTimeout(() => setCopiedSsid(false), 2200);
    } catch {
      setCopiedSsid(true);
      setTimeout(() => setCopiedSsid(false), 2200);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-md rounded-t-3xl sm:rounded-2xl bg-gradient-to-b from-[#0F264C] via-[#0B1730] to-[#050B18] border border-[#1E3A6E] p-6 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.85)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de puxar no mobile */}
        <div className="w-12 h-1.5 rounded-full bg-slate-600/60 mx-auto mb-4 sm:hidden" />

        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1E3A6E]/60 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2F6FD6]/30 border border-[#2F6FD6]/50 flex items-center justify-center text-blue-300">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                Wi-Fi da Loja Jacobs
              </h3>
              <span className="text-[11px] text-[#A8B0BA]">Internet gratuita para clientes</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#102B48] flex items-center justify-center text-[#A8B0BA] hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar painel de Wi-Fi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code de Conexão Automática */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-b from-[#102B48] to-[#0A1C32] border border-[#1E3A6E] mb-5 text-center">
          <div className="p-2.5 bg-white rounded-xl shadow-lg mb-2.5">
            {qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt="QR Code de Conexão Wi-Fi JACOBS" 
                className="w-40 h-40 object-contain rounded-lg"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center text-slate-800">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}
          </div>
          <span className="text-xs font-semibold text-blue-200">
            Aponte a câmera do seu celular para conectar na hora
          </span>
        </div>

        {/* Dados da Rede e Senha */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Nome da Rede */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050B18] border border-[#1E3A6E]/80">
            <div>
              <span className="block text-[10px] uppercase font-bold text-[#A8B0BA] tracking-wider">
                Nome da Rede (SSID)
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-white tracking-widest">
                {STORE_CONFIG.wifi.ssid}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopySsid}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#102B48] hover:bg-[#1A3D66] text-white border border-[#1E3A6E] transition-colors cursor-pointer"
            >
              {copiedSsid ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#A8B0BA]" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Senha da Rede */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#050B18] border border-[#1E3A6E]/80">
            <div className="flex-1 pr-2">
              <span className="block text-[10px] uppercase font-bold text-[#A8B0BA] tracking-wider">
                Senha de Acesso
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-widest">
                  {showPassword ? STORE_CONFIG.wifi.password : '•••••••••••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#A8B0BA] hover:text-white transition-colors cursor-pointer p-0.5"
                  title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyPass}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#E11D2E] hover:bg-[#B62D3A] text-white shadow-[0_2px_8px_rgba(225,29,46,0.4)] transition-colors cursor-pointer shrink-0"
            >
              {copiedPass ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white" />
                  <span>Copiar senha</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Botão de Fechar */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#102B48] hover:bg-[#153860] text-white font-display font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer border border-[#1E3A6E]"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};
