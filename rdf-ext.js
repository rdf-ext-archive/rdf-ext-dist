var
  rdf = require('rdf-ext'),
  JsonLdParser = require('rdf-parser-jsonld'),
  JsonLdSerializer = require('rdf-serializer-jsonld'),
  MicrodataParser = require('rdf-parser-microdata'),
  N3Parser = require('rdf-parser-n3'),
  N3Serializer = require('rdf-serializer-n3'),
  NTriplesSerializer = require('rdf-serializer-ntriples'),
  RdfXmlParser = require('rdf-parser-rdfxml'),
  InMemoryStore = require('rdf-store-inmemory'),
  LdpStore = require('rdf-store-ldp'),
  RdfstoreStore = require('rdf-store-rdfstore-js'),
  SingleGraphStore = require('rdf-store-singlegraph'),
  SparqlStore = require('rdf-store-sparql'),
  SparqlUpdateSerializer = require('rdf-serializer-sparql-update');

var mixin = function (options) {
  var rdfDist = rdf(options);

  rdfDist.JsonLdParser = JsonLdParser;
  rdfDist.parseJsonLd = JsonLdParser.parse.bind(JsonLdParser);
  rdfDist.utils.mimeTypeParserMap['application/ld+json'] = rdfDist.parseJsonLd;

  rdfDist.JsonLdSerializer = JsonLdSerializer.bind(JsonLdSerializer);
  rdfDist.serializeJsonLd = JsonLdSerializer.serialize.bind(JsonLdSerializer);
  rdfDist.utils.mimeTypeSerializerMap['application/ld+json'] = rdfDist.serializeJsonLd;

  rdfDist.MicrodataParser = MicrodataParser;
  rdfDist.parseMicrodata = MicrodataParser.parse.bind(MicrodataParser);

  rdfDist.TurtleSerializer = N3Serializer.bind(N3Serializer);
  rdfDist.serializeTurtle = N3Serializer.serialize.bind(N3Serializer);
  rdfDist.utils.mimeTypeSerializerMap['text/n3'] = rdfDist.serializeTurtle;
  rdfDist.utils.mimeTypeSerializerMap['text/turtle'] = rdfDist.serializeTurtle;

  // N-Triples
  rdfDist.NTriplesSerializer = NTriplesSerializer.bind(NTriplesSerializer);
  rdfDist.serializeNTriples = NTriplesSerializer.serialize.bind(NTriplesSerializer);
  rdfDist.utils.mimeTypeSerializerMap['application/n-triples'] = rdfDist.serializeNTriples;

  // SPARQL Update
  rdfDist.SparqlUpdateSerializer = SparqlUpdateSerializer.bind(SparqlUpdateSerializer);
  rdfDist.serializeSparqlUpdate = SparqlUpdateSerializer.serialize.bind(SparqlUpdateSerializer);
  rdfDist.utils.mimeTypeSerializerMap['application/sparql-update'] = rdfDist.serializeSparqlUpdate;

  rdfDist.RdfXmlParser = RdfXmlParser;
  rdfDist.parseRdfXml = RdfXmlParser.parse.bind(RdfXmlParser);
  rdfDist.utils.mimeTypeParserMap['application/rdf+xml'] = rdfDist.parseRdfXml;

  rdfDist.TurtleParser = N3Parser;
  rdfDist.NTriplesParser = N3Parser;
  rdfDist.parseTurtle = N3Parser.parse.bind(N3Parser);
  rdfDist.parseNTriples = N3Parser.parse.bind(N3Parser);
  rdfDist.utils.mimeTypeParserMap['application/n-triples'] = rdfDist.parseNTriples;
  rdfDist.utils.mimeTypeParserMap['text/n3'] = rdfDist.parseTurtle;
  rdfDist.utils.mimeTypeParserMap['text/turtle'] = rdfDist.parseTurtle;

  rdfDist.InMemoryStore = InMemoryStore.bind(null, rdfDist);
  rdfDist.LdpStore = LdpStore.bind(null, rdfDist);
  rdfDist.RdfstoreStore = RdfstoreStore.bind(null, rdfDist);
  rdfDist.SingleGraphStore = SingleGraphStore.bind(null, rdfDist);
  rdfDist.SparqlStore = SparqlStore.bind(null, rdfDist);

  return rdfDist;
};


if (!rdf.isNode) {
  mixin();
}


module.exports = mixin;
