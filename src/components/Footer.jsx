export default function Footer() {
  return (
    <footer className="py-6 text-center">
      <p className="text-[13px] text-[var(--color-text-faint)]">
        coded by{' '}
        <a
          href="https://instagram.com/berkindev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors duration-200"
        >
          @berkindev
        </a>
      </p>
    </footer>
  )
}
