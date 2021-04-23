using System.Collections.Generic;

namespace PlanningPoker.Web.ViewModels
{
    public class RoomViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IList<UserViewModel> Users { get; set; }
        public bool ShowResults { get; set; }
    }
}
