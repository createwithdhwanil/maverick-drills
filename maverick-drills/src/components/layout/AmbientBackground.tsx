/**
 * MAVERICK DRILLS — GLOBAL CINEMATIC ATMOSPHERE
 *
 * Pure CSS animations.
 * No client-side JavaScript.
 * No animation loops or event listeners.
 * Does not block scrolling, buttons, or links.
 */

export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="md-ambient">
      {/* Slowly drifting crimson light */}
      <div className="md-ambient__glow md-ambient__glow--one" />
      <div className="md-ambient__glow md-ambient__glow--two" />

      {/* Dim technical grid */}
      <div className="md-ambient__grid" />

      {/* Cinematic moving light beam */}
      <div className="md-ambient__beam" />

      {/* Very subtle floating particles */}
      <div className="md-ambient__particles">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            className="md-ambient__particle"
            style={{
              left: `${(index * 31 + 13) % 100}%`,
              top: `${(index * 43 + 17) % 100}%`,
              animationDelay: `${index * -1.7}s`,
              animationDuration: `${16 + (index % 5) * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
