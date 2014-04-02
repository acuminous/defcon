#!/bin/bash
for i in {1..1000}
do
  SEVERITY=$(( ( RANDOM % 5 )  + 1 ))
  curl -X POST localhost:8080/plugin/rest-gateway/api/v1/event -H 'content-Type: application/json' -d "{\"group\": \"repocop\", \"system\": \"repocop\", \"type\": \"release\", \"environment\": \"Integration\", \"message\": \"Released version $i to integration\", \"severity\": \"${SEVERITY}\", \"link\": \"http://10.251.76.56:8080/job/RepoCop/$i/\" }"
done

