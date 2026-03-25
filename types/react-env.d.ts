import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
  interface SVGProps<T> extends SVGAttributes<T> {
    fetchPriority?: 'high' | 'low' | 'auto';
  }
}
