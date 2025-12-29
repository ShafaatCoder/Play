'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body style={{ padding: 20 }}>
        <h1>Internal ERROR </h1>

        <img
          src="https://i.pinimg.com/736x/eb/6a/f5/eb6af5484a4fcbb347cc913ac73a9472.jpg"
          alt="Error"
          width={300}
        />

        <p>{error.message}</p>

        <button onClick={reset}>Retry</button>
      </body>
    </html>
  )
}
