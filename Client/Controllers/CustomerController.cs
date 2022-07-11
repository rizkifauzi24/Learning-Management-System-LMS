﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class CustomerController : Controller
    {
        [Authorize(Roles = "User")]
        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        public IActionResult History()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        public IActionResult MyCourse()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        public IActionResult Section()
        {
            return View();
        }

        [Authorize(Roles = "User")]
        public IActionResult MyProfile()
        {
            return View();
        }
    }
}