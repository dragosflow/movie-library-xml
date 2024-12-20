export const xml1 = `
<?xml version="1.0" ?>
<movieCollection xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:noNamespaceSchemaLocation="path/to/movieSchema.xsd">
    <movies>
        <movie id="m1" genreId="g1">
            <title>The Shawshank Redemption</title>
            <year>1994</year>
            <director>Frank Darabont</director>
            <actors>
                <actorRef>a1</actorRef>
                <actorRef>a2</actorRef>
            </actors>
        </movie>
        <movie id="m2" genreId="g2">
            <title>The Dark Knight</title>
            <year>2008</year>
            <director>Christopher Nolan</director>
            <actors>
                <actorRef>a3</actorRef>
                <actorRef>a4</actorRef>
            </actors>
        </movie>
    </movies>
    <actors>
        <actor id="a1">
            <name>Tim Robbins</name>
            <nationality>American</nationality>
        </actor>
        <actor id="a2">
            <name>Morgan Freeman</name>
            <nationality>American</nationality>
        </actor>
        <actor id="a3">
            <name>Christian Bale</name>
            <nationality>British</nationality>
        </actor>
        <actor id="a4">
            <name>Heath Ledger</name>
            <nationality>Australian</nationality>
        </actor>
    </actors>
    <genres>
        <genre id="g1">
            <name>Drama</name>
            <description>Stories with emotional and thematic depth</description>
        </genre>
        <genre id="g2">
            <name>Action</name>
            <description>High-intensity scenes with physical feats</description>
        </genre>
    </genres>
</movieCollection>
`;

export const xmlschema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <!-- Root Element -->
  <xs:element name="movieCollection">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="movies" type="MoviesType"/>
        <xs:element name="actors" type="ActorsType"/>
        <xs:element name="genres" type="GenresType"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <!-- Movies Definition -->
  <xs:complexType name="MoviesType">
    <xs:sequence>
      <xs:element name="movie" maxOccurs="unbounded">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="title" type="xs:string"/>
            <xs:element name="year" type="xs:gYear"/>
            <xs:element name="director" type="xs:string"/>
            <xs:element name="actors" type="ActorReferencesType"/>
          </xs:sequence>
          <xs:attribute name="id" type="xs:ID" use="required"/>
          <xs:attribute name="genreId" type="xs:IDREF" use="required"/>
        </xs:complexType>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <!-- Actors Definition -->
  <xs:complexType name="ActorsType">
    <xs:sequence>
      <xs:element name="actor" maxOccurs="unbounded">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="nationality" type="xs:string"/>
          </xs:sequence>
          <xs:attribute name="id" type="xs:ID" use="required"/>
        </xs:complexType>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <!-- Genres Definition -->
  <xs:complexType name="GenresType">
    <xs:sequence>
      <xs:element name="genre" maxOccurs="unbounded">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="name" type="xs:string"/>
            <xs:element name="description" type="xs:string" minOccurs="0"/>
          </xs:sequence>
          <xs:attribute name="id" type="xs:ID" use="required"/>
        </xs:complexType>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <!-- Actor References Definition -->
  <xs:complexType name="ActorReferencesType">
    <xs:sequence>
      <xs:element name="actorRef" type="xs:IDREF" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>

</xs:schema>
`;
