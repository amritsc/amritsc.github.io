// V3 Style Company Logos - Fixed Chase logo
export const CompanyLogo = ({ company }) => {
  const logos = {
    jpmc: (
      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <g fill="#117ACA">
            <path d="M50 5 L75 20 L75 45 L50 30 Z" />
            <path d="M95 50 L80 75 L55 75 L70 50 Z" />
            <path d="M50 95 L25 80 L25 55 L50 70 Z" />
            <path d="M5 50 L20 25 L45 25 L30 50 Z" />
          </g>
        </svg>
      </div>
    ),
    aws: (
      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path d="M30 60 Q50 75 70 60" stroke="#FF9900" strokeWidth="6" fill="none"/>
          <path d="M25 45 L40 35 L40 55 Z" fill="#FF9900"/>
          <path d="M45 45 L60 35 L60 55 Z" fill="#FF9900"/>
          <path d="M65 45 L80 35 L80 55 Z" fill="#FF9900"/>
        </svg>
      </div>
    ),
    microsoft: (
      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <rect x="10" y="10" width="38" height="38" fill="#F25022"/>
          <rect x="52" y="10" width="38" height="38" fill="#7FBA00"/>
          <rect x="10" y="52" width="38" height="38" fill="#00A4EF"/>
          <rect x="52" y="52" width="38" height="38" fill="#FFB900"/>
        </svg>
      </div>
    ),
    prudential: (
      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="#0066cc" strokeWidth="4"/>
          <path d="M50 30 L70 70 L30 70 Z" fill="#0066cc"/>
        </svg>
      </div>
    ),
  };
  return logos[company] || null;
};
