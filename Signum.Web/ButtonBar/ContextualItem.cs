﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Signum.Utilities;
using System.Text;
using Signum.Entities;

namespace Signum.Web
{
    public delegate ContextualItem GetContextualItemDelegate(ControllerContext controllerContext, Lite lite, object queryName, string prefix);

    public class ContextualItem : ToolBarMenu
    {
        public string Content { get; set; }

        public override string ToString()
        {
            return Content;
        }
    }

    public static class ContextualItemsHelper
    {
        public static bool EntityCtxMenuInSearchPage = false;
        public static event GetContextualItemDelegate GetContextualItemsForLite;

        public static void Start()
        {
            EntityCtxMenuInSearchPage = true;
        }

        public static List<ContextualItem> GetContextualItemListForLite(ControllerContext controllerContext, Lite lite, object queryName, string prefix)
        {
            List<ContextualItem> items = new List<ContextualItem>();
            if (lite != null)
            {
                if (GetContextualItemsForLite != null)
                    items.AddRange(GetContextualItemsForLite.GetInvocationList()
                        .Cast<GetContextualItemDelegate>()
                        .Select(d => d(controllerContext, lite, queryName, prefix))
                        .NotNull().ToList());
            }
            return items;
        }

        public static string ContextualItemsToString(this List<ContextualItem> items)
        {
            if (items == null || items.Count == 0)
                return "";

            StringBuilder sb = new StringBuilder();

            foreach (var item in items)
            {
                if (item != null)
                    sb.AppendLine(item.ToString());
            }

            return sb.ToString();
        }
    }
}