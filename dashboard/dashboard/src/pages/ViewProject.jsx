import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios.get(`https://portfolio-backend-code-kwdg.onrender.com/api/v1/project/get/${id}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setTechnologies(res.data.project.technologies);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    };
    getProject();
    }, [id]);

    const descriptionInListFormat = description.split(". ");
    const technologiesInListFormat = technologies.split(", ");
  return(
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                </div>
                <div className="mt-10 flex flex-col gap-5">
                    <div className="w-full sm:col-span-4">
                        <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                        <img src={projectBanner ? projectBanner : "./vite.svg"} alt={title} className='w-full h-auto'></img>
                    </div>
                    <br />
                    <div className="w-full sm:col-span-4">
                        <p className='text-2xl mb-2'>Description:</p>
                        <ul className='list-disc'>
                          {
                            descriptionInListFormat.map((item, index) => {
                              return(
                                <li key={index}>{item}</li>
                              )
                            })
                          }
                        </ul>
                    </div><br />
                    <div className="w-full sm:col-span-4">
                        <p className='text-2xl mb-2'>Technologies:</p>
                        <ul className='list-disc'>
                          {
                            technologiesInListFormat.map((item, index) => {
                              return(
                                <li key={index}>{item}</li>
                              )
                            })
                          }
                        </ul>
                    </div><br />
                    <div>
                      <p className='text-2xl mb-2'>Stack:</p>
                      <p>{stack}</p>
                    </div><br />
                    <div>
                      <p className='text-2xl mb-2'>Deployed:</p>
                      <p>{deployed}</p>
                    </div><br />
                    <div>
                      <p className='text-2xl mb-2'>Github Repository Link:</p>
                      <Link to={gitRepoLink} target="_blank" className='text-sky-700'>{gitRepoLink}</Link>
                    </div><br />
                    <div>
                      <p className='text-2xl mb-2'>Project Link:</p>
                      <Link to={projectLink ? projectLink : "/"} target="_blank" className='text-sky-700'>{projectLink ? projectLink : "Still Not Deployed"}</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ViewProject