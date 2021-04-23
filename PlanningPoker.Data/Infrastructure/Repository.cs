using MongoDB.Driver;
using PlanningPoker.Data.Entities;
using System.Collections.Generic;
using System.Linq;

namespace PlanningPoker.Data.Infrastructure
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly IMongoCollection<T> collection;

        public Repository(IMongoDBContext mongodbContext)
        {
            collection = mongodbContext.GetDatabase("PlanningPoker").GetCollection<T>(typeof(T).Name);
        }

        public string Add(T model)
        {
            collection.InsertOne(model);
            return model.Id;
        }

        public void Delete(string id)
        {
            collection.DeleteOne(Builders<T>.Filter.Eq("Id", id));
        }

        public T Find(string id)
        {
            try
            {
                return collection.Find(Builders<T>.Filter.Eq("Id", id)).FirstOrDefault();  
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<T> GetAll()
        {
            return collection.Find(_ => true).ToList();  
        }

        public void Update(T model)
        {
           collection.ReplaceOneAsync(filter: g => g.Id == model.Id, replacement: model);
        }
    }
}
