export default function PublicLayout({ children }) {
  return (
    <div style={{ background: "red", minHeight: "100vh", padding: 40 }}>
      <h1 style={{ color: "white", fontSize: 30 }}>PUBLIC LAYOUT ACTIVE</h1>
      {children}
    </div>
  );
}
