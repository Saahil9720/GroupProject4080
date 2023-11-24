import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const GithubActivity = ({ username, theme }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubActivity = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/events`
        );
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub activities:', error);
        // Handle error state or set default activities
      }
    };

    fetchGithubActivity();
  }, [username]);

  const getTableStyles = (theme) => {
    switch (theme) {
      case 'light':
        return 'text-gray-800';
      case 'dark':
        return 'text-gray-400';
      case 'cupcake':
        return 'text-grey-600';
      case 'bumblebee':
        return 'text-grey-900';
      case 'emerald':
        return 'text-green';
      case 'corporate':
        return 'text-black';
      case 'synthwave':
        return 'text-purple-50';
      case 'retro':
        return 'text-stone-800';
      case 'cyberpunk':
        return 'text-stone-800';
      case 'valentine':
        return 'text-stone-700';
      case 'halloween':
        return 'text-stone-300';
      case 'garden':
        return 'text-stone-950';
      case 'forest':
        return 'text-stone-300';
      case 'aqua':
        return 'text-slate-200';
      case 'lofi':
        return 'text-gray-800';
      case 'pastel':
        return 'text-gray-700';
      case 'fantasy':
        return 'text-gray-800';
      case 'black':
        return 'text-stone-300';
      case 'luxury':
        return 'text-orange-400';
      case 'dracula':
        return ' text-stone-100';
      case 'cmyk':
        return 'text-zinc-800';
      case 'autumn':
        return ' text-zinc-800';
      case 'business':
        return ' text-stone-300';
      case 'acid':
        return ' text-zinc-800';
      case 'lemonade':
        return 'text-zinc-800';
      case 'night':
        return 'text-neutral-300';
      case 'coffee':
        return ' text-stone-500';
      case 'winter':
        return 'text-slate-600';
      case 'procyon':
        return ' text-zinc-800';
      // Add more cases for other themes and their respective Tailwind CSS classes
    }
  };

  return (
    <>
      {!loading && (
        <div className="card compact bg-base-100 shadow bg-opacity-40">
          <div className="card-body">
            <h1 className="text-base-content opacity-70 p-4 text-lg font-semibold">
              GitHub Activity
            </h1>
            <div className="overflow-x-auto">
              <table
                className={`bg-base-100border-collapse border border-gray-400  ${getTableStyles(
                  theme
                )}`}
              >
                <thead>
                  <tr className="bg-base-100">
                    <th className="border px-4 py-2">Event Type</th>
                    <th className="border px-4 py-2">Repository</th>
                    <th className="border px-4 py-2">Date and Time</th>
                    <th className="border px-4 py-2">Actor</th>
                    <th className="border px-4 py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-opacity-70' : 'bg-opacity-90'
                      } bg-base-100`}
                    >
                      <td className="border px-4 py-2">{activity.type}</td>
                      <td className="border px-4 py-2">{activity.repo.name}</td>
                      <td className="border px-4 py-2">
                        {new Date(activity.created_at).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">
                        {activity.actor.login}
                      </td>
                      <td className="border px-4 py-2">
                        {activity.type === 'PushEvent' &&
                        activity.payload.commits &&
                        activity.payload.commits.length > 0
                          ? activity.payload.commits[0].message
                          : activity.payload.description || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

GithubActivity.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GithubActivity;
