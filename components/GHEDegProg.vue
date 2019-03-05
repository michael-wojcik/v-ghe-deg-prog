<template>
  <div id="ghe-deg-prog-wrapper">
    <tabs :terms="results.terms" :nodes="results.nodes"></tabs>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import client from '../apollo-gql-client';
import Tabs from './Tabs';

export default {
  name: 'GHEDegProg',
  components: { Tabs },

  data: () => ({
    results: {
      nodes: [],
      terms: [],
    },
  }),

  created() {
    this.queryResults();
  },

  methods: {
    queryResults() {
      client.query({
        query: gql(`
          query exploreDegreePrograms {
            taxonomyTermQuery (filter: {
              conditions: [
                {operator: EQUAL, field: "vid", value: ["degree_type"]},
              ]
            }) {
              entities {
                ... on TaxonomyTerm {
                  ... on TaxonomyTermDegreeType {
                    vid {
                      targetId
                    }
                    tid
                    name
                    fieldPCta {
                      entity {
                        entityRendered
                      }
                    }
                  }
                }
              }
            }
            nodeQuery (filter: {
              conditions: [
                {operator: EQUAL, field: "type", value: ["degree_program"]},
                {operator: EQUAL, field: "status", value: ["1"]}
              ]
            }) {
              ... on EntityQueryResult {
                entities {
                  ... on NodeDegreeProgram {
                    ... DegreeProgramPrimaryFields
                    fieldRelatedPrograms {
                      entity {
                        ... DegreeProgramPrimaryFields
                      }
                    }
                  }
                }
              }
            }
          }

          fragment DegreeProgramPrimaryFields on NodeDegreeProgram {
            entityUrl {
              path
            }
            title
            body {
              processed
              summaryProcessed
            }
            fieldDegreeType {
              entity {
                vid {
                  targetId
                }
                tid
                name
              }
            }
            fieldWeight
          }
        `),
      }).then(
        (result) => {
          if (
            result &&
            result.data &&
            result.data.nodeQuery.entities &&
            result.data.taxonomyTermQuery.entities
          ) {
            this.results.nodes = result.data.nodeQuery.entities;
            this.results.terms = result.data.taxonomyTermQuery.entities;
          }
        }
      );
    },
  },
};
</script>
