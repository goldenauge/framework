using Signum.Entities.Basics;

namespace Signum.SMS;

public class SMSConfigurationEmbedded : EmbeddedEntity
{
    public CultureInfoEntity DefaultCulture { get; set; }
}
