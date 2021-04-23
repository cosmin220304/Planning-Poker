using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace PlanningPoker.Data.Entities
{
    public class Room : BaseEntity
    {
        public string Name { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public IEnumerable<string> UserIds { get; set; }

        public bool ShowResults { get; set; }
    }
}
