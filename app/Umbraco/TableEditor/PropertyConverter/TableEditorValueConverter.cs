using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Umbraco.Core;
using Umbraco.Web;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;
using Umbraco.Core.Logging;
using TableEditor.Models;
using TableEditor.Extensions;

namespace TableEditor.PropertyConverter
{
    [PropertyValueType(typeof(TableEditorModel))]
    [PropertyValueCache(PropertyCacheValue.All, PropertyCacheLevel.Content)]
    public class TableEditorValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("Imulus.TableEditor");
        }

        public override object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
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
                    LogHelper.Error<TableEditorModel>(ex.Message, ex);
                    return new TableEditorModel();
                }
            }

            return sourceString;
        }
    }
}
