SELECT
  DAY,
  COUNT(*) AS number_of_assignments,
  SUM(duration) AS duration
FROM
  assignments
GROUP BY
  DAY
ORDER BY
  DAY ASC;