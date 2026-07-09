import { useEffect, useRef } from "react";

export default function BowlModal({ bowl, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const focusableElements = Array.from(
          document.querySelectorAll(
            ".bowl-modal button, .bowl-modal [href], .bowl-modal input, .bowl-modal select, .bowl-modal textarea, .bowl-modal [tabindex]:not([tabindex='-1'])"
          )
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) {
          return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="bowl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label="Close ingredient details"
        >
          Close
        </button>
        <img src={bowl.image} alt={`${bowl.name} açaí bowl`} />
        <div className="modal-copy">
          <h2 id="modal-title">{bowl.name}</h2>
          <p>{bowl.description}</p>
          <h3>Ingredients</h3>
          <ul>
            {bowl.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
