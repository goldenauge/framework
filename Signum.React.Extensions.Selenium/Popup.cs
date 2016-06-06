﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using Signum.Engine.Basics;
using Signum.Entities;
using Signum.Utilities;

namespace Signum.React.Selenium
{
    public class Popup : IDisposable
    {
        public RemoteWebDriver Selenium { get; private set; }

        public IWebElement Element { get; private set; }

        public Popup(IWebElement element)
        {
            this.Selenium = element.GetDriver();
            this.Element = element;

            this.WaitVisible();
        }

        private void WaitVisible()
        {
            this.Element.WaitElementVisible(By.CssSelector("modal.fade.in"));
        }

        public WebElementLocator CloseButton
        {
            get { return this.Element.WithLocator(By.CssSelector(".modal-header button.close")); }
        }

        public bool AvoidClose { get; set; }

        public virtual void Dispose()
        {
            if (!Selenium.IsAlertPresent())
                if (!AvoidClose)
                {
                    try
                    {
                        var button = this.CloseButton.TryFind();
                        if (button != null && button.Displayed)
                            button.Click();
                    }
                    catch (ElementNotVisibleException)
                    {
                    }
                    catch (StaleElementReferenceException)
                    {
                    }

                    this.WaitNotVisible();
                }

            if (Disposing != null)
                Disposing(OkPressed);
        }

        public void Close()
        {
            this.CloseButton.Find().Click();
        }

        public Action<bool> Disposing;

        public WebElementLocator OkButton
        {
            get { return this.Element.WithLocator(By.CssSelector(".sf-entity-button.sf-ok-button")); }
        }


        public PopupControl<T> OkWaitPopupControl<T>() where T : Entity
        {
            var element = this.OkButton.Find().CaptureOnClick();
            var disposing = this.Disposing;
            this.Disposing = null;
            return new PopupControl<T>(element) { Disposing = disposing };
        }

        public bool OkPressed;
        public void OkWaitClosed()
        {
            this.OkButton.Find().Click();
            this.WaitNotVisible();
            this.OkPressed = true;
        }



        public void WaitNotVisible()
        {
            this.Element.GetDriver().Wait(() => !this.Element.Displayed);
        }
    }

    public class SelectorModal : Popup
    {
        public SelectorModal(IWebElement element) : base(element) { }

        public void Select(string value)
        {
            Select(this.Element, value);
        }

        public void Select(Enum enumValue)
        {
            Select(this.Element, enumValue.ToString());
        }

        public void Select<T>()
        {
            Select(this.Element, TypeLogic.GetCleanName(typeof(T)));
        }

        public static bool IsSelector(IWebElement element)
        {
            return element.IsElementPresent(By.CssSelector(".sf-selector-modal"));
        }

        public static void Select(IWebElement element, Type type)
        {
            Select(element, TypeLogic.GetCleanName(type));
        }

        public static void Select(IWebElement element, string name)
        {
            element.FindElement(By.CssSelector("button[name={0}]".FormatWith(name))).Click();
        }
    }

    public class ValueLinePopup : Popup
    {
        public ValueLinePopup(IWebElement element) : base(element)
        {
        }

        public ValueLineProxy ValueLine
        {
            get
            {
                var formGroup = this.Element.FindElement(By.CssSelector("div.modal-body div.form-grup"));
                return new ValueLineProxy(formGroup, null);
            }
        }

        public string StringValue
        {
            get { return ValueLine.StringValue; }
            set { ValueLine.StringValue = value; }
        }

        public T GetValue<T>()
        {
            return ValueLine.GetValue<T>();
        }

        public void SetValue(object value, string format = null)
        {
            ValueLine.SetValue(value, format);
        }
    }


    public class PopupControl<T> : Popup, ILineContainer<T>, IEntityButtonContainer<T>, IValidationSummaryContainer where T : ModifiableEntity
    {
        public PropertyRoute Route { get; private set; }

        public PopupControl(IWebElement element, PropertyRoute route = null)
            : base(element)
        {
            this.Route = route == null || route.IsImplementation(typeof(T)) ? PropertyRoute.Root(typeof(T)) : route;
        }

        public IWebElement ContainerElement()
        {
            return this.Element;
        }

 
        public void CloseDiscardChanges()
        {
            this.CloseButton.Find().Click();

            Selenium.ConsumeAlert();

            this.WaitNotVisible();
        }

        public override void Dispose()
        {
            if (!AvoidClose)
            {
                string confirmationMessage;
                Selenium.Wait(() =>
                {
                    var close = this.CloseButton.TryFind();
                    if (close?.Displayed == true)
                    {
                        try
                        {
                            close.Click();
                        }
                        catch (NoSuchElementException e)
                        {
                            if (!e.Message.Contains("not found"))
                                throw;
                        }
                    }

                    if (Selenium.IsAlertPresent())
                    {
                        var alert = Selenium.SwitchTo().Alert();
                        confirmationMessage = alert.Text;
                        alert.Accept();
                    }

                    return false;
                }, () => "popup {0} to disapear with or without confirmation".FormatWith());
            }

            if (Disposing != null)
                Disposing(this.OkPressed);
        }

        public EntityInfoProxy EntityInfo()
        {
            return EntityInfoProxy.Parse(this.Element.FindElement(By.CssSelector("div.sf-main-control")).GetAttribute("data-main-entity"));
        }

        public PopupControl<T> WaitLoaded()
        {
            this.Element.WaitElementPresent(By.CssSelector("div.modal.fade.in"));
            return this;
        }
    }
}
