import Image from "next/image";

export default function Header() {
  return (
    <header style={styles.header}>

      {/* Logo + nome */}
      <div style={styles.left}>
        <Image
          src="/Logo.png"
          alt="Nova Web Logo"
          width={40}
          height={40}
        />
        <span style={styles.title}>Nova Web</span>
      </div>

    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #eee",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  title: {
    fontSize: "20px",
    fontWeight: "bold",
  }
};

export default function Layout({ children }) {
  return (
    <div lang="pt">
      {children}
    </div>
  );
}