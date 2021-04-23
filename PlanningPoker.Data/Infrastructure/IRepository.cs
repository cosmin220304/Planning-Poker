using System.Collections.Generic;

namespace PlanningPoker.Data.Infrastructure
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Find(string id);
        string Add(T model);
        void Update(T model);
        void Delete(string id); 
    }
}
