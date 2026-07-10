const stripPhotos = [
  "/images/rose-city.png",
  "/images/fab.png",
  "/images/sunrise.png",
  "/images/shop.png",
  "/images/islander.png",
  "/images/pbee.png"
];

export default function PhotoStrip() {
  return (
    <section className="photo-strip" aria-label="Blended photo strip">
      {/* Replace these with the new bottom-strip photos when they are ready. */}
      {stripPhotos.map((photo) => (
        <img key={photo} src={photo} alt="" />
      ))}
    </section>
  );
}
