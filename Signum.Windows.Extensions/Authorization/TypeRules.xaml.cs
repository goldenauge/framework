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
using System.Windows.Shapes;
using Signum.Entities.Authorization;
using Signum.Entities;
using Signum.Services;
using Signum.Utilities;
using System.Windows.Markup;
using System.ComponentModel;

namespace Signum.Windows.Authorization
{
    /// <summary>
    /// Interaction logic for Test.xaml
    /// </summary>
    public partial class TypeRules : Window
    {
        public static Type RuleType = typeof(AllowedRule<TypeDN, TypeAllowed>);
        public static Type GroupType = typeof(NamespaceNode);

        public Lite<RoleDN> Role
        {
            get { return (Lite<RoleDN>)GetValue(RoleProperty); }
            set { SetValue(RoleProperty, value); }
        }

        public bool Properties { get; set; }
        public bool Operations { get; set; }
        public bool Queries { get; set; }

        public static readonly DependencyProperty RoleProperty =
            DependencyProperty.Register("Role", typeof(Lite<RoleDN>), typeof(TypeRules  ), new UIPropertyMetadata(null));
        public TypeRules()
        {
            InitializeComponent();
            this.Loaded += new RoutedEventHandler(Test_Loaded);
        }

        ScrollViewer swTree; 

        void Test_Loaded(object sender, RoutedEventArgs e)
        {
            swTree = treeView.Child<ScrollViewer>(WhereFlags.VisualTree);
            grid.Bind(Grid.WidthProperty, swTree.Content, "ActualWidth");
            Load();
        }


        private void Load()
        {
            TypeRulePack trp = Server.Return((ITypeAuthServer s) => s.GetTypesRules(Role));

            DataContext = trp;

            Dictionary<string, bool> expanded = treeView.ItemsSource == null ? new Dictionary<string, bool>() :
                ((List<NamespaceNode>)treeView.ItemsSource).ToDictionary(a => a.Name, a => a.Expanded); 

            treeView.ItemsSource = (from r in trp.Rules
                                    group r by r.Resource.Namespace into g
                                    orderby g.Key
                                    select new NamespaceNode
                                    {
                                        Name = g.Key,
                                        Expanded = expanded.TryGetS(g.Key) ?? false, 
                                        SubNodes = g.OrderBy(a => a.Resource.ClassName).ToList()
                                    }).ToList();
        }

        public DataTemplateSelector MyDataTemplateSelector;


        private void btSave_Click(object sender, RoutedEventArgs e)
        {
            Server.Execute((ITypeAuthServer s) => s.SetTypesRules((TypeRulePack)DataContext));
            Load();
        }

        private void btReload_Click(object sender, RoutedEventArgs e)
        {
            Load(); 
        }

        private void properties_Click(object sender, RoutedEventArgs e)
        {
            AllowedRule<TypeDN, TypeAllowed> rules = (AllowedRule<TypeDN, TypeAllowed>)((Button)sender).DataContext;

            new PropertyRules
            {
                Owner = this,
                Type = rules.Resource,
                Role = Role
            }.Show(); 
        }

        private void operations_Click(object sender, RoutedEventArgs e)
        {
            AllowedRule<TypeDN, TypeAllowed> rules = (AllowedRule<TypeDN, TypeAllowed>)((Button)sender).DataContext;

            new OperationRules
            {
                Owner = this,
                Type = rules.Resource,
                Role = Role
            }.Show(); 
        }

        private void queries_Click(object sender, RoutedEventArgs e)
        {
            AllowedRule<TypeDN, TypeAllowed> rules = (AllowedRule<TypeDN, TypeAllowed>)((Button)sender).DataContext;

            new QueryRules
            {
                Owner = this,
                Type = rules.Resource,
                Role = Role
            }.Show(); 
        }

        private void treeView_ScrollChanged(object sender, ScrollChangedEventArgs e)
        {
            swTop.ScrollToHorizontalOffset(e.HorizontalOffset);
        }

    }

    public class NamespaceNode
    {
        bool expanded;
        public bool Expanded
        {
            get { return expanded; }
            set { expanded = value; }
        }

        public string Name { get; set; }
        public List<AllowedRule<TypeDN, TypeAllowed>> SubNodes { get; set; } //Will be TypeAccesRule or NamespaceNode
    }
}
