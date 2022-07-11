using API.Contex;
using API.Models;
using API.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class TestimonyRepository : GeneralRepository<MyContex, Testimony, int>
    {
        private readonly MyContex _context;
        public TestimonyRepository(MyContex myContext) : base(myContext)
        {
            this._context = myContext;
        }

        public IEnumerable<GetTestimonyVM> GetAll()
        {
            var getTestimonyAll = (from co in _context.Testimony
                                     //join a in myContext.Accounts on e.NIK equals a.NIK
                                 join to in _context.Users on co.UserId equals to.UserId


                                 select new GetTestimonyVM()
                                 {
                                     TId = co.TId,
                                     UserId = to.UserId,
                                     CourseId = co.CourseId,
                                     Deskripsi = co.Deskripsi,
                                     Username = String.Format("{0} {1}", to.FirstName, to.LastName)
                                 }).ToList();

            return getTestimonyAll;

        }

    }
}
