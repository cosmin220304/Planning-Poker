using MongoDB.Driver;

namespace PlanningPoker.Data
{
    public interface IMongoDBContext
    {
        IMongoDatabase GetDatabase(string name);
    }
}
