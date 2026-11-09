interface AboutProps {
  text: string;
}

export function About({ text }: AboutProps) {
  return (
    <section>
      <h2>About</h2>
      <p>{text}</p>
    </section>
  );
}
