using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

namespace api_banco_solidario.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RateTypesController : Controller
    {
        private IConfiguration _configuration;

        public RateTypesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetRateTypes")]

        public JsonResult GetRateTypes()
        {
            string query = "select * from rateTypes";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpGet]
        [Route("GetRateType")]

        public dynamic GetRateType([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "select * from rateTypes where id_rateType=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    if (table.Rows.Count > 0)
                    {
                        return new
                        {
                            success = true,
                            message = "Rate Types Found Successfully",
                            result = table
                        };
                    }
                    else
                    {
                        return new
                        {
                            success = false,
                            message = "Rate Types not found",
                        };

                    }
                }
            }
        }

        [HttpPut]
        [Route("UpdateRateType")]

        public dynamic UpdateRateType([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string name = data.name.ToString();
            string query = "update rateTypes set name = @name  where id_rateType=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", name);
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = false,
                        message = "Updated Successfully"
                    };
                }
            }
        }

        [HttpPost]
        [Route("AddRateType")]

        public dynamic AddRateType([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string newName = data.name.ToString();
            string newDescription = data.description.ToString();
            string newCreated = data.created.ToString();
            string query = "insert into rateTypes values (@newName, @newDescription, @newCreated)";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@newName", newName);
                    myCommand.Parameters.AddWithValue("@newDescription", newDescription);
                    myCommand.Parameters.AddWithValue("@newCreated", newCreated);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = true,
                        message = "Rate Type Created",
                    };
                }
            }
        }

        [HttpDelete]
        [Route("DeleteRateType")]

        public dynamic DeleteRateType([FromBody] Object optData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(optData.ToString());
            string id = data.id.ToString();
            string query = "delete from rateTypes where id_rateType=@id";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("DefaultConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    return new
                    {
                        success = true,
                        message = "Rate Type Deleted",
                    };
                }
            }
        }
    }
}
