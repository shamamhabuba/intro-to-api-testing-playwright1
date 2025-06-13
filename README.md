| Scenario Name                 | Method | Type     | Expected Status         | Status |
| ----------------------------- | ------ | -------- | ----------------------- | ------ |
| GET existing order            | GET    | Positive | StatusCodes.OK          | ✅      |
| GET non-existent order        | GET    | Negative | StatusCodes.NOT\_FOUND  | ✅      |
| POST valid order              | POST   | Positive | StatusCodes.OK          | ✅      |
| PUT update existing order     | PUT    | Positive | StatusCodes.OK          | ✅      |
| PUT update non-existent order | PUT    | Negative | StatusCodes.NOT\_FOUND  | ✅      |
| DELETE existing order         | DELETE | Positive | StatusCodes.NO\_CONTENT | ✅      |
| DELETE non-existent order     | DELETE | Negative | StatusCodes.NOT\_FOUND  | ✅      |
