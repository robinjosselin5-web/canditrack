-- Heuristic and intentionally non-exhaustive backfill of known spoken languages.
UPDATE "cv_skills"
SET "category" = 'SPOKEN_LANGUAGES'
WHERE "category" = 'PROGRAMMING_LANGUAGES'
  AND regexp_replace(
    translate(lower(trim("name")), 'àâäçéèêëîïôöùûüÿœæ', 'aaaceeeeiioouuyoeae'),
    '[[:space:]]+',
    ' ',
    'g'
  ) ~ '(^|[^a-z])(francais|french|anglais|english|espagnol|spanish|allemand|german|italien|italian|portugais|portuguese|neerlandais|dutch|arabe|arabic|chinois|chinese|mandarin|japonais|japanese|coreen|korean|russe|russian|polonais|polish|turc|turkish|hindi|grec|greek|ukrainien|ukrainian|roumain|romanian|suedois|swedish|norvegien|norwegian|danois|danish|finnois|finnish)([^a-z]|$)';
