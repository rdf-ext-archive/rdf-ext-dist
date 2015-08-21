var
  rdf = require('rdf-ext'),
  InMemoryStore = require('rdf-store-inmemory'),
  LdpStore = require('rdf-store-ldp'),
  RdfstoreStore = require('rdf-store-rdfstore-js'),
  SingleGraphStore = require('rdf-store-singlegraph'),
  SparqlStore = require('rdf-store-sparql');


var mixin = function (options) {
  var rdfDist = rdf(options);

  rdfDist.InMemoryStore = InMemoryStore.bind(null, rdfDist);
  rdfDist.LdpStore = LdpStore.bind(null, rdfDist);
  rdfDist.RdfstoreStore = RdfstoreStore.bind(null, rdfDist);
  rdfDist.SingleGraphStore = SingleGraphStore.bind(null, rdfDist);
  rdfDist.SparqlStore = SparqlStore.bind(null, rdfDist);

  return rdfDist;
};


module.exports = mixin;
