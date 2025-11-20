export default function TranslationResult({
  translation,
}: {
  translation: string | null | undefined;
}) {
  return (
    <>
      <h2>{translation && translation}</h2>
    </>
  );
}
