'use client';

export const NavSection = ({ title, items, isActive, onItemClick, className = '' }) => (
  <div className={className}>
    {title && <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>}
    <nav className="mt-2 space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.href)}
          onClick={onItemClick}
        />
      ))}
    </nav>
  </div>
);
