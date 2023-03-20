import React from 'react';
import { CheckCircle, DeleteCircle, InfoEmpty, WarningTriangle, CoffeeCup, Cancel } from 'iconoir-react';
import { useToast } from '../../hooks';

export const ToastProvider: React.FC = () => {
  const { toasts, deleteToast } = useToast();

  return (
    <div className="toast">
      {toasts.map((toast, index) => (
        <div
          key={`${index}-${toast.title}`}
          className={`alert ${toast.type && `alert-${toast.type}`} shadow-lg gap-10`}>
          <div>
            {toast.type === 'success' && <CheckCircle className="w-6 h-6" />}
            {toast.type === 'error' && <DeleteCircle className="w-6 h-6" />}
            {toast.type === 'warning' && <WarningTriangle className="w-6 h-6" />}
            {toast.type === 'info' && <InfoEmpty className="w-6 h-6" />}
            {!toast.type && <CoffeeCup className="w-6 h-6" />}
            <div>
              <h3 className="font-bold">{toast.title}</h3>
              <div className="text-xs">{toast.description}</div>
            </div>
          </div>
          <div>
            <button className="btn btn-sm btn-square" onClick={() => deleteToast(toast.id)}>
              <Cancel className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
