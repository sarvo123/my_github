import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInform";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import { useCallback, useState , useEffect} from "react";
import toast from "react-hot-toast";

const HomePage = () => {
    // states ...
    const [userProfile , setUserProfile] = useState(null);
    const [repos , setRepos] = useState([]);
    const [loading , setLoading] =useState(false);

    const [sortType ,setSortType] = useState('forks');

    const getUserProfileAndRepos = useCallback (async (username="sarvo123")=>{
        setLoading(true);
        try{
            const userRes = await fetch(`https://api.github.com/users/${username}`,{
                headers : {
                    authorization : `token ${import.meta.env.VITE_GITHUB_API_KEY}`
                },
            });
            if (!userRes.ok) {
                throw new Error(`Error: ${userRes.status}`);
            }
            const userProfile = await userRes.json();
            setUserProfile(userProfile);

            const repoRes = await fetch(userProfile.repos_url);
            if (!repoRes.ok) {
                throw new Error(`Error: ${repoRes.status}`);
            }
            const repos = await repoRes.json();
            repos.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)) // descending , recent first ...
            setRepos(repos);
            console.log('userprofile', userProfile);
            console.log('repos : ', repos);
            
            return {userProfile ,repos};
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    },[]);

    useEffect(()=>{
        getUserProfileAndRepos();
    },[getUserProfileAndRepos])

    const onSearch = async(e,username) =>{
        e.preventDefault();

        setLoading(true);
        setRepos([]);
        setUserProfile(null);


        const {userProfile , repos} =await getUserProfileAndRepos(username);
        setUserProfile(userProfile);
        setLoading(false);
        setSortType('recent');
    }

    const onSort = (sortType)=>{
        if(sortType == "recent"){
            repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));  // descending recent first ...
        }
        else if(sortType == "stars"){
            repos.sort((a,b) => b.stargazers_count - a.stargazers_count);  // descending recent first ...
        }
        else if(sortType == "forks" ){
            repos.sort((a,b) => b.forks_count - a.forks_count);   // descending 
        }
         
        setSortType(sortType);
        setRepos([...repos]);

    };

	return (
		<div className='m-4'>
			<Search onSearch={onSearch}/>
            {repos.length > 0  && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo  userProfile={userProfile} />}
				{!loading && <Repos repos={repos}/>}
				{/* <Spinner /> */}
			</div>
		</div>
	);
};

export default HomePage ;