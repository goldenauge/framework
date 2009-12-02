﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Signum.Entities.Authorization;
using Signum.Entities;
using Signum.Services; 

namespace Signum.Windows.Authorization
{
    /// <summary>
    /// Interaction logic for Usuario.xaml
    /// </summary>
    public partial class Role : UserControl, IHaveQuickLinks
    {
        public Role()
        {
            InitializeComponent();
        }

        Lite<RoleDN> Lite
        {
            get { return ((RoleDN)DataContext).ToLite(); }
        }


        public List<QuickLink> QuickLinks()
        {
            List<QuickLink> links = new List<QuickLink>();

            if (!Server.Implements<IPermissionAuthServer>() || BasicPermissions.AdminRules.IsAuthorized())
            {
                if (Server.Implements<IQueryAuthServer>())
                    links.Add(new QuickLink("Query Rules") { Action = () => new QueryRules { Role = Lite }.Show() });

                if (Server.Implements<IFacadeMethodAuthServer>())
                    links.Add(new QuickLink("Facade Method Rules") { Action = () => new FacadeMethodRules { Role = Lite }.Show() });

                if (Server.Implements<ITypeAuthServer>())
                    links.Add(new QuickLink("Type Rules") { Action = () => new TypeRules { Role = Lite }.Show() });

                if (Server.Implements<IPermissionAuthServer>())
                    links.Add(new QuickLink("Permission Rules") { Action = () => new PermissionRules { Role = Lite }.Show() });

                if (Server.Implements<IOperationAuthServer>())
                    links.Add(new QuickLink("Operation Rules") { Action = () => new OperationRules { Role = Lite }.Show() });

                if (Server.Implements<IEntityGroupAuthServer>())
                    links.Add(new QuickLink("Entity Groups") { Action = () => new EntityGroupRules { Role = Lite }.Show() });
            }

            return links;
        }
    }
}
