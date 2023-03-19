import { Facebook, Twitter, YouTube } from 'iconoir-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <Twitter className="w-8 h-8" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <YouTube className="w-8 h-8" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <Facebook className="w-8 h-8" />
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};
