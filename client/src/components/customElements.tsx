import { CONTAINER_STYLE, FORM_ERROR_STYLE } from "../styles";

export const Container = ({ children }: { children: JSX.Element }) => (
  <div style={CONTAINER_STYLE}>
    {children}
  </div>
);

export const FormError = ({ error }: { error?: string }) => (
  <p style={FORM_ERROR_STYLE}>
    {error}
  </p>
);