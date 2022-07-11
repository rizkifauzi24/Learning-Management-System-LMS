using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class GetTestimonyVM
    {
        public int TId { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        public string Deskripsi { get; set; }
        public string Username { get; set; }
    }
}
