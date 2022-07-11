using API.Models;
using API.Repository.Data;
using API.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonyController : BaseController<Testimony, TestimonyRepository, int>
    {
        private readonly TestimonyRepository _testimonyRepository;
        public TestimonyController(TestimonyRepository testimonyRepository) : base(testimonyRepository)
        {
            this._testimonyRepository = testimonyRepository;
        }

        [HttpGet("GetTestimony")]
        public IEnumerable<GetTestimonyVM> GetAll()
        {
            return _testimonyRepository.GetAll().ToList();
        }
    }
}
