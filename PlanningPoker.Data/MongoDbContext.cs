using MongoDB.Driver;

namespace PlanningPoker.Data
{
    public class MongoDbContext : IMongoDBContext
    {
        private readonly MongoClient client;

        public MongoDbContext()
        {
            client = new MongoClient("mongodb+srv://cosmin0123:cosmin0123@cluster0.x5azz.mongodb.net/PlanningPoker?retryWrites=true&w=majority");
        }

        public IMongoDatabase GetDatabase(string name)
        {
            return client.GetDatabase(name);
        } 
    }
}
