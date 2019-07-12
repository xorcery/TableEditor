using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using TableEditor.Models;
using TableEditor.Extensions;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;
using Umbraco.Web.Composing;

namespace TableEditor.PropertyConverter
{
    public class TableEditorValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.EditorAlias.Equals("Imulus.TableEditor");
        }

        public override PropertyCacheLevel GetPropertyCacheLevel(PublishedPropertyType propertyType)
        {
            return PropertyCacheLevel.Element;
        }

        public override Type GetPropertyValueType(PublishedPropertyType propertyType)
        {
            return typeof(TableEditorModel);
        }

        public override object ConvertSourceToIntermediate(IPublishedElement owner, PublishedPropertyType propertyType,
            object source, bool preview)
        {

            if (source == null)
            {
                return new TableEditorModel();
            }

            var sourceString = source.ToString();

            if (sourceString.DetectIsJson())
            {
                try
                {
                    var tableEditor = JsonConvert.DeserializeObject<TableEditorModel>(sourceString);

                    return tableEditor;
                }
                catch (Exception ex)
                {
                    Current.Logger.Error( typeof(TableEditorModel),ex, ex.Message + "{1}", source.ToString());
                    return new TableEditorModel();
                }
            }

            return sourceString;
        }

    }
}
