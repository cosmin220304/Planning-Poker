namespace PlanningPoker.Data.Entities
{
    public class User : BaseEntity
    {
        public string Username { get; set; }
        public int? CardValue { get; set; }
    }
}
